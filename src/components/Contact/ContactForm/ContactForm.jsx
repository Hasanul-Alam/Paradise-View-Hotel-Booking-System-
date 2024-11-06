export default function ContactForm() {
  return (
    <div className="w-[70%] mx-auto max-md:w-[95%] py-10">
      <div className="flex justify-center items-center max-md:block gap-12">
        <input
          type="text"
          className="w-full px-3 py-3 border border-1 border-black"
          placeholder="Full Name"
        />
        <input
          type="email"
          className="w-full px-3 py-3 border border-1 border-black max-md:mt-5"
          placeholder="Enter Email"
        />
      </div>
      <textarea
      rows={8}
        className="px-5 py-5 border border-1 border-black w-full mt-5"
        name=""
        id=""
        placeholder="Enter your message here."
      ></textarea>
      {/* Submit Button */}
      <div className="flex justify-center mt-10 max-md:mt-5">
      <button className="text-lg bg-[#7C6A46] text-white px-8 py-2 rounded hover:bg-[#8C6B27]">Send</button>
      </div>
    </div>
  );
}
