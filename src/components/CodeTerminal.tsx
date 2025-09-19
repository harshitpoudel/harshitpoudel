import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Terminal, Play, Square } from 'lucide-react';

const codeSnippets = [
  {
    title: "Robot Controller",
    language: "C++",
    code: `// Line following robot controller
#include <Arduino.h>

int leftSensor = 2;
int rightSensor = 3;
int leftMotor = 9;
int rightMotor = 10;

void setup() {
  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);
  pinMode(leftMotor, OUTPUT);
  pinMode(rightMotor, OUTPUT);
}

void loop() {
  int left = digitalRead(leftSensor);
  int right = digitalRead(rightSensor);
  
  if (left && right) {
    // Move forward
    analogWrite(leftMotor, 200);
    analogWrite(rightMotor, 200);
  } else if (left) {
    // Turn right
    analogWrite(leftMotor, 150);
    analogWrite(rightMotor, 50);
  } else if (right) {
    // Turn left
    analogWrite(leftMotor, 50);
    analogWrite(rightMotor, 150);
  }
}`
  },
  {
    title: "Computer Vision",
    language: "Python",
    code: `import cv2
import numpy as np

# Initialize camera
cap = cv2.VideoCapture(0)

def detect_objects(frame):
    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Define range for blue color
    lower_blue = np.array([100, 50, 50])
    upper_blue = np.array([130, 255, 255])
    
    # Create mask
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # Find contours
    contours, _ = cv2.findContours(
        mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE
    )
    
    return contours

while True:
    ret, frame = cap.read()
    if ret:
        objects = detect_objects(frame)
        cv2.drawContours(frame, objects, -1, (0, 255, 0), 2)
        cv2.imshow('Object Detection', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`
  },
  {
    title: "IoT Sensor Data",
    language: "Python",
    code: `import paho.mqtt.client as mqtt
import json
import time
from datetime import datetime

class IoTSensorHub:
    def __init__(self, broker_host="localhost"):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.connect(broker_host, 1883, 60)
        
    def on_connect(self, client, userdata, flags, rc):
        print(f"Connected with result code {rc}")
        client.subscribe("sensors/+/data")
        
    def on_message(self, client, userdata, msg):
        try:
            data = json.loads(msg.payload.decode())
            sensor_id = msg.topic.split('/')[1]
            
            print(f"[{datetime.now()}] Sensor {sensor_id}:")
            print(f"  Temperature: {data['temp']}°C")
            print(f"  Humidity: {data['humidity']}%")
            print(f"  Light: {data['light']} lux")
            
            self.process_sensor_data(sensor_id, data)
            
        except Exception as e:
            print(f"Error processing message: {e}")
    
    def process_sensor_data(self, sensor_id, data):
        # Automated responses based on sensor data
        if data['temp'] > 25:
            self.send_command("fan", "on")
        if data['light'] < 100:
            self.send_command("lights", "on")
    
    def send_command(self, device, action):
        topic = f"devices/{device}/command"
        self.client.publish(topic, action)

# Initialize and start the IoT hub
hub = IoTSensorHub()
hub.client.loop_forever()`
  }
];

export function CodeTerminal() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const typeCode = (code: string) => {
    setIsTyping(true);
    setDisplayedCode('');
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(code.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  const startTyping = () => {
    typeCode(codeSnippets[currentSnippet].code);
  };

  const nextSnippet = () => {
    const next = (currentSnippet + 1) % codeSnippets.length;
    setCurrentSnippet(next);
    typeCode(codeSnippets[next].code);
  };

  useEffect(() => {
    typeCode(codeSnippets[0].code);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-green-400" />
          <span className="text-green-400 text-sm font-mono">
            {codeSnippets[currentSnippet].title} - {codeSnippets[currentSnippet].language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={startTyping}
            className="p-1 rounded bg-green-600 hover:bg-green-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isTyping}
          >
            {isTyping ? (
              <Square className="h-3 w-3 text-white" />
            ) : (
              <Play className="h-3 w-3 text-white" />
            )}
          </motion.button>
          
          <motion.button
            onClick={nextSnippet}
            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTyping}
          >
            Next
          </motion.button>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 h-80 overflow-auto bg-gray-900">
        <pre className="text-sm text-gray-100 font-mono leading-relaxed">
          <code>
            {displayedCode}
            {(isTyping || cursorVisible) && (
              <motion.span
                className="bg-green-400 text-gray-900 ml-1"
                animate={{ opacity: cursorVisible ? 1 : 0 }}
              >
                █
              </motion.span>
            )}
          </code>
        </pre>
      </div>
      
      {/* Status Bar */}
      <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 flex justify-between border-t border-gray-700">
        <span>
          {isTyping ? 'Typing...' : 'Ready'} | 
          Line {displayedCode.split('\n').length} | 
          {displayedCode.length} chars
        </span>
        <span>
          {currentSnippet + 1}/{codeSnippets.length}
        </span>
      </div>
    </motion.div>
  );
}