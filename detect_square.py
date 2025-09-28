#!/usr/bin/env python3
import sys
import cv2
import numpy as np
import os

def crop_rectangles(image_path, output_folder="cropped_rectangles"):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    image = cv2.imread(image_path)
    if image is None:
        print(f"画像を読み込めませんでした: {image_path}")
        return
    original = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    print(f"{len(contours)}個の輪郭が検出されました。")

    rect_count = 0
    min_area = 400
    for i, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        if area < min_area:
            continue
        epsilon = 0.02 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        if len(approx) == 4:
            rect_count += 1
            cv2.drawContours(image, [approx], 0, (0, 255, 0), 2)
            x, y, w, h = cv2.boundingRect(approx)
            roi = original[y:y+h, x:x+w]
            output_path = os.path.join(output_folder, f"rectangle_{rect_count}.jpg")
            cv2.imwrite(output_path, cv2.resize(roi, (232, 145)))
            print(f"保存しました: {output_path}")
    print(f"合計 {rect_count} 個の四角形を検出して切り抜きました")

if __name__ == "__main__":
    crop_rectangles(sys.argv[1])
