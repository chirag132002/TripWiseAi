import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { chatSession } from "@/service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

function CreateTrip() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
  location: "New York" ,
  noOfDays: 5,
  budget: "Moderate",
  noOfPeople: 5,
});
const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  {
    useEffect(() => {
      console.log(formData);
    }, [formData]);
  }

  {/*const handleSelect = _.debounce((value) => {
    setPlace(value);
    handleInputChange("location", value);
  }, 1000);*/}



  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 10) {
      toast("Please enter no. of days less than 10");
      return;
    }
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.noOfPeople
    ) {
      toast("Please enter all the details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userChoice: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    {/*navigate("/view-trip/" + docId);*/}
  };

  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us about your Travel Preferences🚢✈️⛱️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Fill out this basic information amd out trip planner will genrate a
        customized itinerary based on your preferences.
      </p>
      {/*Destination search bar*/}

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <label className="text-black text-2xl font-semibold mb-2">
            Choose Your Destination
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          />
        </div>

        {/*Duration*/}

        <div className="flex flex-col w-full max-w-2xl mb-8">
          <label className="text-black text-2xl font-semibold mb-2">
            For how many days are you planning?
          </label>
          <Input
            placeholder="Example: 6"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/*Budget*/}
        <div className="flex flex-col w-full max-w-2xl mb-8">
          <h2 className="text-black text-2xl font-semibold mb-4">
            What is your budget?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl border-2 hover:border-blue-500 hover:bg-white transition-all duration-300 p-6 cursor-pointer ${
                  formData?.budget === item.title
                    ? "shadow-lg bg-blue-400 text-black"
                    : "bg-white"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h2 className="text-lg font-bold mb-1">{item.title}</h2>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*NO of Travellers*/}
        <div className="flex flex-col w-full max-w-2xl mb-8">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl border-2 hover:border-blue-500 hover:bg-white transition-all duration-300 p-6 cursor-pointer ${
                  formData?.noOfPeople === item.people
                    ? "shadow-lg bg-blue-400 text-black"
                    : "bg-white"
                }`}
                onClick={() => handleInputChange("noOfPeople", item.people)}
              >
                <div className="flex items-center justify-center">
                  <div className="text-4xl mr-2">{item.icon}</div>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                </div>
                <p className="text-center mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-center w-full max-w-2xl">
          <Button
            onClick={onGenerateTrip}
            disabled={loading}
            className="w-full py-3 text-lg mt-3 mb-52"
          >
            {loading ? "Generating Trip..." : "Generate Trip"}
          </Button>
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <img src="logo.svg" alt="Logo" className="w-20 mb-4" />
                <span>Sign in with Google Authentication securely</span>
                <Button onClick={login} className="w-full mt-5 ">
                  <FcGoogle className="h-7 w-7" />
                  Sign in with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
