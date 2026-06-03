# Robot Path Planner

An interactive web application designed to help you create, test, and save movement paths for autonomous robots. It provides a visual map where you can click to draw your route, a side panel to change specific settings, and quick keyboard shortcuts to speed up your work.

---

## Features

### Working with Multiple Tabs

* **Multi-Tasking:** Manage multiple robot paths at the same time using tabs at the top of the screen, just like a web browser.
* **Easy Renaming:** Double-click any tab button to type a new name for that route.
* **Deleting Paths:** Click the X button on a tab to permanently delete that path.
* **Creating New Paths:** Click the circular + button on the far right of the tab bar to start a brand-new, empty path.

### Using the Map Canvas

* **Drawing a Route:** Click anywhere on the field map to place down path points in order.
* **Drag-and-Drop:** Left-click and hold any point to drag it to a new spot on the map.
* **Current Selection:** The point you are currently editing will have a slightly larger circle indicator so you always know which one is selected.

### The Side Menu

* **Precise Coordinates:** Type exact X and Y numbers into the menu to position a point perfectly.
* **Direction Control:** Choose whether the robot should drive Forwards or Backwards for the line segment following your selected point.
* **Action Numbers:** Assign a specific action number to a point (for example, telling the robot to lift an arm or drop an intake when it reaches that spot).
* **Robot Measurements:** Set the robot's Starting Angle and Robot Width so the app understands the size and orientation of your machine.
* **Visual Toggles:** Turn on the robot footprint overlay to see if the robot's physical size will hit any walls or obstacles, or turn on point information to see exact measurements right next to the points on the map.

---

## Keyboard Shortcuts

Use these quick keyboard commands to build and edit your paths much faster:

| Key Command | Action Performed |
| --- | --- |
| **Arrow Keys** | Move the selected point by 10 mm in any direction. |
| **Backspace** | Delete the last point you placed down. |
| **Enter** | Bring back the last point you deleted. |
| **Q** | Clear all points from your current map. |
| **P** | Load your previous save (The app automatically saves every 5 seconds and when you close it). |
| **Number Keys (0-9)** | Jump straight to that specific point number on your path. |
| **- (Minus)** | Quickly set the selected point's direction to Backwards. |
| **= (Equals)** | Quickly set the selected point's direction to Forwards. |
| **O** | Turn the robot size overlay graphics on or off. |
| **I** | Turn the point information labels on or off. |

---

## Setup & Guide

### 1. Setting Up Your Field Map

1. Open the side menu by clicking the Square Toggle Button.
2. Look for the Field section and click Import Field to upload an image of your game field or floor plan (.png or .jpg).
3. Enter the Field Width and Field Height in millimeters (mm) so the app knows the real-life size of your workspace.

### 2. Editing Your Path

* Click on any point on the map to open its specific settings in the side menu.
* Change its direction dropdown or type in an action number, and the visual path will update automatically.

---

## Saving and Loading Your Work

The app provides three different options in the lower section of the side menu to save or load your paths:

### Option A: Export Route (Text Guide for Robots)

Click Export Route to download a simple text file meant for your robot's computer. The file automatically loops through every point in your path and writes out instructions using this exact 5-line sequence for each point:

```text
1 turn (left:-1/right:1)
2 angle (target angle deg)
3 direction (forward:1, backwards:-1)
4 distance (distance in mm)
5 action (action number)

```

### Option B: Download Mission (Full JSON Backup)

Click Export Mission to download a master file (.json) that saves everything in your current workspace, including all your points, your custom field image, and your measurements. Use this whenever you want to save a complete backup of your project to your computer.

### Option C: Import Mission (Restore Saved Work)

Click Import Mission to select a previously saved master file (.json) from your computer and load it right back into an active tab.
