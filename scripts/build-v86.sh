#!/bin/bash
set -ex

# Name of the working container and image
IMAGE_NAME="alpine-rust-clippy"
CONTAINER_NAME="alpine_clawmark_build"
TAR_NAME="alpine_rootfs.tar"

# Step 1: Build Docker image with Rust and Clippy
docker build -t $IMAGE_NAME - <<EOF
FROM i386/alpine:3.18.6

ENV ROOT_PASSWORD=root
RUN apk add --no-cache openrc alpine-base agetty alpine-conf bash curl git

RUN apk add --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/edge/main/ mkinitfs
RUN apk add --no-cache linux-lts linux-firmware-none

RUN echo "root:\$ROOT_PASSWORD" | chpasswd
RUN setup-hostname localhost
RUN sed -i 's/getty 38400 tty1/agetty --autologin root tty1 linux/' /etc/inittab

RUN rc-update add devfs sysinit && \
    rc-update add dmesg sysinit && \
    rc-update add mdev sysinit && \
    rc-update add hwdrivers sysinit && \
    rc-update add hwclock boot && \
    rc-update add modules boot && \
    rc-update add sysctl boot && \
    rc-update add hostname boot && \
    rc-update add syslog boot && \
    rc-update add bootmisc boot && \
    rc-update add killprocs shutdown

RUN apk add --no-cache rust cargo && \
    rustup component add clippy || true

RUN mkinitfs -F "ata base ide scsi virtio ext4 9p" \$(cat /usr/share/kernel/lts/kernel.release)
EOF

# Step 2: Export rootfs from the container
docker create --name $CONTAINER_NAME $IMAGE_NAME
docker export $CONTAINER_NAME > $TAR_NAME
docker rm $CONTAINER_NAME

# Step 3: Extract vmlinuz and initramfs
mkdir -p public/v86
mkdir -p buildfs
tar -xf $TAR_NAME -C buildfs
VMZ=$(find buildfs/boot -name 'vmlinuz-*' | head -n1)
INITRD=$(find buildfs/boot -name 'initramfs-*' | head -n1)

echo "DEBUG: Found kernel: $VMZ"
echo "DEBUG: Found initrd: $INITRD"

if [[ -z "$VMZ" || -z "$INITRD" ]]; then
  echo "❌ Could not find kernel or initrd in buildfs/boot"
  exit 1
fi

cp "$VMZ" public/v86/vmlinuz
cp "$INITRD" public/v86/initrd

# Step 4: Convert to fs.json
mkdir -p scripts/tools
curl -sSfL -o scripts/tools/fs2json.py https://raw.githubusercontent.com/copy/v86/master/tools/fs2json.py
python3 scripts/tools/fs2json.py --exclude /.dockerenv --out public/v86/fs.json $TAR_NAME

echo "✅ v86 Rust+Clippy image prepared in public/v86/"