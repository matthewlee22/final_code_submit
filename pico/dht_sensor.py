from machine import Pin, I2C
from time import sleep
from dht import DHT11


pin = Pin(28)
temp_sensor = DHT11(pin)

# Measure current tempurature and humidity
def dht_update():
    temp_sensor.measure()
    sleep(.5)

# Return saved temperature as a string
def get_temp():
    t = temp_sensor.temperature()
    return str(t)

# Return saved humidity as a string
def get_humidity():
    h = temp_sensor.humidity()
    return str(h)
