// Ultrasonic Sensor HC-SR04
#define trigPin 2 // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define echoPin 3 // Arduino pin tied to echo pin on the ultrasonic sensor.
unsigned long duration;
float distance;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculates the distance
  distance = duration * 0.034 / 2;

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);

  // Sends the distance to cloud database
  sendToCloud(distance);

  delay(1000);
}

void sendToCloud(float distance) {
  // Initialize Ethernet client
  EthernetClient client;

  // Connect to server (replace xxx.xxx.xxx.xxx and yyyy with your server IP address and port)
  if (client.connect("xxx.xxx.xxx.xxx", yyyy)) {
    // Build HTTP request
    String data = "distance=" + String(distance);
    String request = "POST /api/data HTTP/1.1\r\n";
    request += "Host: xxx.xxx.xxx.xxx:yyyy\r\n";
    request += "Content-Type: application/x-www-form-urlencoded\r\n";
    request += "Content-Length: " + String(data.length()) + "\r\n";
    request += "Connection: close\r\n\r\n" + data;

    // Send request to server
    client.print(request);

    // Wait for response from server
    while (!client.available());

    // Print response from server
    while (client.available()) {
      Serial.write(client.read());
    }

    // Close connection
    client.stop();
  }
}

