# Robotics Route Planner
Route planner is a tool that helps with planning robot routes for a variety of robotics challenges.

## Using the map
- Place points on the map by clicking.
- Move points around by dragging or with the arrow keys.

## Decoding the route
Routes are exported as text files similar to this:
```
-1
-1
1
445
0
-1
-90
1
495
0
```
Routes are composed of instructions that span 5 lines:
```
Turn direction (-1 = left 1 = right)
turn angle     (-180 to 180 deg)
Direction      (1 = forwards, -1 = backwards)
Distance       (milimetres)
Function code  (ex: 1 --> lift arm)
```
The previous route moves forwards for 445mm at 0deg turns left then moves forwards for 495mm at -90deg.

## Keyboard shortcuts
* Delete points with **backspace**.
* Restore points with **enter**.

-  Clear the route with **q**.
-  Load save with **p**.

* Toggle robot overlay with **o**.
* Toggle point information with **i**.

- Set point to forwards with **+**.
- Set point to backwards with **-**.

* Set function codes with **numbers**.