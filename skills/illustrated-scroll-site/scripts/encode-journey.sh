#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 3 || ! -f "$1" || ! "$3" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo 'Usage: encode-journey.sh INPUT_VIDEO OUTPUT_DIRECTORY BASENAME' >&2
  exit 2
fi
command -v ffmpeg >/dev/null
command -v cwebp >/dev/null
source_video="$1"
delivery_dir="$2"
asset_name="$3"
mkdir -p "$delivery_dir"
scratch_dir="$(mktemp -d)"
trap 'rm -rf "$scratch_dir"' EXIT
color_filter="${COLOR_FILTER:-null}"
ffmpeg -hide_banner -loglevel error -y -i "$source_video" -map 0:v:0 -an \
  -vf "$color_filter,scale='min(1280,iw)':-2" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart \
  "$delivery_dir/$asset_name.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$source_video" -map 0:v:0 -an \
  -vf "$color_filter,scale='min(960,iw)':-2" \
  -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
  -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart \
  "$delivery_dir/$asset_name-mobile.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$delivery_dir/$asset_name.mp4" \
  -map 0:v:0 -frames:v 1 "$scratch_dir/poster.png"
cwebp -quiet -q 90 "$scratch_dir/poster.png" -o "$delivery_dir/$asset_name-poster.webp"
