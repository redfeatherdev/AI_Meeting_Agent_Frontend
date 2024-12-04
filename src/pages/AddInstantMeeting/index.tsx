import axios from "axios";
import { useState } from "react";
import DatePicker from "../../components/Forms/DatePicker";
import { useNavigate } from "react-router-dom";

const AddInstantMeeting = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    summary: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    organizer_email: '',
    creator_email: '',
    hangout_link: '',
  });

  const [error, setError] = useState({
    summary: '',
    start_time: '',
    end_time: '',
    hangout_link: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    let validationErrors = {
      summary: '',
      start_time: '',
      end_time: '',
      hangout_link: ''
    };

    if (event.summary === '') validationErrors.summary = 'Event Name is required';
    if (event.start_time === '') validationErrors.start_time = 'Start Time is required';
    if (event.end_time === '') validationErrors.end_time = 'End Time is required';
    if (event.hangout_link === '') validationErrors.hangout_link = 'Meeting URL is required';
    if (event.start_time && event.end_time) {
      const startTime = new Date(event.start_time);
      const endTime = new Date(event.end_time);

      if (endTime <= startTime) {
        validationErrors.end_time = 'End Time must be later than Start Time';
      }
    }

    setError(validationErrors);

    if (Object.values(validationErrors).every(error => error === '')) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/add-event/`, event, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.status === 201) {
          navigate("/");
          setError({
            summary: '',
            start_time: '',
            end_time: '',
            hangout_link: ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="grow rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h2 className="font-medium text-black dark:text-white text-xl">
            Add Instant Meeting
          </h2>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Event Name
            </label>
            <input
              name='summary'
              type="text"
              value={event.summary}
              onChange={handleChange}
              placeholder="Event Name"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-warning text-sm mt-2">{error.summary}</span>
          </div>
          <div>
            <DatePicker
              title="Start Time"
              name="start_time"
              value={event.start_time}
              onChange={handleChange}
            />
            <span className="text-warning text-sm mt-2">{error.start_time}</span>
          </div>
          <div>
            <DatePicker
              title="End Time"
              name="end_time"
              value={event.end_time}
              onChange={handleChange}
            />
            <span className="text-warning text-sm mt-2">{error.end_time}</span>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Meeting URL
            </label>
            <input
              type="text"
              name="hangout_link"
              value={event.hangout_link}
              onChange={handleChange}
              placeholder="Meeting URL"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-warning text-sm mt-2">{error.hangout_link}</span>
          </div>
          <div>
            <button
              className="w-full inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={handleSubmit}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstantMeeting;
