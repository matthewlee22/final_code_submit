from connections import connect_mqtt, connect_internet
from time import sleep
from constants import ssid, mqtt_server, mqtt_user, mqtt_pass
from motortest3 import move_forward, move_backward, turn_left, turn_right, stop
from dht_sensor import dht_update, get_temp, get_humidity
from distance_sensor import get_distance
import servotest, steppertest

# Function to handle an incoming message

def cb(topic, msg):
    
    # Rover movement calls
    if topic == b"direction":
        if msg == b"forward":
            print("Forward")
            move_forward()
#             sleep(0.001)
        elif msg == b"backward":
            print("Backward")
            move_backward()
#             sleep(0.001)
        elif msg == b"left":
            print("left")
            turn_left()
#             sleep(0.001)
        elif msg == b"right":
            print("right")
            turn_right()
#             sleep(0.001)
        elif msg == b"stop":
            print("Stop")
            stop()
#             sleep(0.001)
    # Arm calls (untested)
    if topic == b"arm":
        if msg == b"forward":
            print("Arm Forward")
            servotest.add_angle1(10)

        elif msg == b"backward":
            print("Arm backward")
            servotest.add_angle1(-10)

        elif msg == b"left":
            print("Arm left")
            steppertest.rotate_left()

        elif msg == b"right":
            print("Arm right")
            steppertest.rotate_right()
            
        elif msg == b"up":
            print("Arm up")
            servotest.add_angle2(10)
    
        elif msg == b"down":
            print("Arm down")
            servotest.add_angle2(-10)

        elif msg == b"levelup":
            print("Claw level up")
            servotest.add_angle3(10)
    
        elif msg == b"leveldown":
            print("Claw level down")
            servotest.add_angle3(-10)

        elif msg == b"in":
            print("Claw in")
            servotest.add_angle4(5)
            servotest.add_angle5(-5)

        elif msg == b"out":
            print("Claw out")
            servotest.add_angle4(-5)
            servotest.add_angle5(5)
            
            


def main():
    try:
        connect_internet("HAck-Project-WiFi-1",password="UCLA.HAcK.2024.Summer")
        client = connect_mqtt("cabab558654e453d9b25d76f57219102.s1.eu.hivemq.cloud", "picow", "Fun1234!")

        client.set_callback(cb)
        client.subscribe("direction")
        client.subscribe("arm")
        counter = 0
        while True:
            # For every 10 check_msg() calls, update the current sensors
            client.check_msg()
            if counter == 10:
                client.publish("ultrasonic", get_distance())
                dht_update()
                client.publish("temp", get_temp())
                client.publish("humidity", get_humidity())
                counter = 0
            sleep(0.1)
            counter+=1
    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
if __name__ == "__main__":
    main()

