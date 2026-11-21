window.CODE={
 "file": "Smart_Ride_fare_system.cpp",
 "parts": [
  {
   "id": "base",
   "title": "Base class: Smart",
   "desc": "The parent class. It stores the passenger name, id and base fare, and marks displayrideDetails() and calculatefare() as virtual so each ride service can override them.",
   "code": "class Smart{\nprotected:\nstring passengername;\nint id;\ndouble basefare;\npublic:\nSmart(string p, int i, double b){\npassengername= p;\nid = i;\nbasefare = b;\n}\nvirtual void displayrideDetails(){ //Parent function must be virtual\ncout<<\"Passenger name : \"<<passengername<<endl; //Function name must be EXACTLY the same\ncout<<\"Id : \"<<id<<endl; //Parameter list must be identical\ncout<<\"Base fare : \"<<basefare<<endl; //Return type must be same (or compatible)\n} //Access specifier can change\nvirtual double calculatefare(){\nreturn 0;\n}\n};"
  },
  {
   "id": "eco",
   "title": "Economy ride",
   "desc": "Economy inherits from Smart and overrides both functions. Its fare is the base fare plus distance in km multiplied by 8.",
   "code": "class Economy: public Smart{\nprivate :\ndouble distanceKm;\npublic:\nEconomy(string p ,int i, double b, double d) :Smart(p,i,b)\n{\ndistanceKm =d;\n}\nvoid displayrideDetails() override\n{\nSmart::displayrideDetails();\ncout<<\"Distance in Km : \"<<distanceKm<<endl;\n}\ndouble calculatefare() override\n{\ndouble finalfare = basefare + (distanceKm * 8);\nreturn finalfare;\n}\n};"
  },
  {
   "id": "lux",
   "title": "Luxury ride",
   "desc": "Luxury also inherits from Smart. Its fare is the base fare plus distance in km multiplied by 15, plus a service charge.",
   "code": "class Luxury : public Smart{\nprivate :\ndouble distanceKm;\ndouble serviceCharge;\npublic:\nLuxury(string p ,int i, double b, double d,double s ):Smart (p,i,b)\n{\ndistanceKm =d;\nserviceCharge=s;\n}\nvoid displayrideDetails() override\n{\nSmart::displayrideDetails(); // ::(scope resolution operator)it calls the displayrideDetails() Function of the Class Smart\ncout<<\"Distance in Km : \"<<distanceKm<<endl;\ncout<<\"Service Charges : \"<<serviceCharge<<endl;\n}\ndouble calculatefare ()override\n{\ndouble finalfare = basefare + (distanceKm * 15)+ serviceCharge;\nreturn finalfare;\n}\n};"
  },
  {
   "id": "main",
   "title": "main()",
   "desc": "Creates one Economy and one Luxury ride, then prints the details and final fare of each through the same calls.",
   "code": "int main(){\ncout<<\"------- Economy class-------- \"<<endl;\nEconomy e1(\"Sara\", 201,100, 15);\ne1.displayrideDetails();\ncout<<\"Final fare : \"<<e1.calculatefare()<<endl;\ncout<<\"------- Luxury class-------- \"<<endl;\nLuxury l1(\"Ahmed\", 305 ,120,10,80 );\nl1.displayrideDetails();\ncout<<\"Final fare : \"<<l1.calculatefare()<<endl;\nreturn 0;\n}"
  },
  {
   "id": "out",
   "title": "Program output",
   "desc": "What the program prints when compiled and run.",
   "code": "------- Economy class-------- \nPassenger name : Sara\nId : 201\nBase fare : 100\nDistance in Km : 15\nFinal fare : 220\n------- Luxury class-------- \nPassenger name : Ahmed\nId : 305\nBase fare : 120\nDistance in Km : 10\nService Charges : 80\nFinal fare : 350"
  }
 ]
};
