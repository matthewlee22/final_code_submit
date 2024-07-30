from hcsr04 import HCSR04
from machine import Pin
from time import sleep


dist_sensor = HCSR04(trigger_pin=16, echo_pin=0)

# Measure distance and return it as a string
def get_distance():
    distance = dist_sensor.distance_cm()
    return str(distance)





    
    