from machine import Pin
from time import sleep

# pins set as array
pins = [
        Pin(18, Pin.OUT),
        Pin(19, Pin.OUT),
        Pin(20, Pin.OUT),
        Pin(21, Pin.OUT),
        ]
# step sequences based on direction
right_step_sequence = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
    ]

left_step_sequence = [
    [0,0,0,1],
    [0,0,1,0],
    [0,1,0,0],
    [1,0,0,0]
    ]

# variables to ensure stepper eventually stops
running = True
max_steps = 150

# rotate stepper right for 150 steps
def rotate_right ():
    global running
    running = True
    step_count = 0
    while running and step_count < max_steps:
        for step in right_step_sequence:
            for i in range(len(pins)):
                pins[i].value(step[i])
                sleep(.001)
            step_count+=1
            if step_count >= max_steps:
                running = False
                break

# rotate stepper left for 150 steps
def rotate_left ():
    global running
    running = True
    step_count = 0
    while running and step_count < max_steps:
        for step in left_step_sequence:
            for i in range(len(pins)):
                pins[i].value(step[i])
                sleep(.001)
            step_count+=1
            if step_count >= max_steps:
                running = False
                break

# hard set running to false
def stepper_stop():
    global running
    running = False

    
