export default function MainBody() {
  return (
    <div className="w-[80%] mx-auto max-md:w-[95%] font-mulish py-10">
      <div className="grid grid-cols-2 justify-between items-center max-md:grid-cols-1">
        <div className="relative w-[458px] h-[513px] bg-blue-500 ms-20 max-md:w-[200px] max-md:h-[226px]">
          {/* First Div with background color */}
          <div className="absolute inset-0 h-full w-full bg-[#7C6A46]"></div>

          {/* Overlapping Div */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full h-full flex items-center justify-center mt-12 -ml-8">
            <div>
              <img src="https://i.ibb.co.com/fnXnf51/Rectangle-34.png" alt="" />
              <h3 className="text-3xl text-center mt-3 max-md:text-xl">
                Chidinma James (Manager)
              </h3>
            </div>
          </div>
        </div>
        <div className="w-[580px] max-md:w-full max-md:mt-20">
          <p className="text-sm mt-5">
            The United Nations is an international organization founded in 1945.
            Currently made up of 193 Member States, the UN and its work are
            guided by the purposes and principles contained in its founding
            Charter. The UN has evolved over the years to keep pace with a
            rapidly changing world. But one thing has stayed the same: it
            remains the one place on Earth where all the worlds nations can
            gather together, discuss common problems, and find shared solutions
            that benefit all of humanity. The Secretary-General is Chief
            Administrative Officer of the UN and is also a symbol of the
            Organizations ideals and an advocate for all the worlds peoples,
            especially the poor and vulnerable.
          </p>
          <p className="text-sm mt-5">
            The Secretary-General is appointed by the General Assembly on the
            recommendation of the Security Council for a 5-year, renewable term.
            The current Secretary-General, and the 9th occupant of the post, is
            António Guterres of Portugal, who took office on 1 January 2017. On
            the 18th of June, 2021, Guterres was re-appointed to a second term,
            pledging as his priority to continue helping the world chart a
            course out of the COVID-19 pandemic.
          </p>
          <p className="text-sm mt-5">
            The United Nations is an international organization founded in 1945.
            Currently made up of 193 Member States, the UN and its work are
            guided by the purposes and principles contained in its founding
            Charter. The UN has evolved over the years to keep pace with a
            rapidly changing world. But one thing has stayed the same: it
            remains the one place on Earth where all the worlds nations can
            gather together, discuss common problems, and find shared solutions
            that benefit all of humanity. The Secretary-General is Chief
            Administrative Officer of the UN and is also a symbol of the
            Organizations ideals and an advocate for all the worlds peoples,
            especially the poor and vulnerable.
          </p>
          <p className="text-sm mt-5">
            The Secretary-General is appointed by the General Assembly on the
            recommendation of the Security Council for a 5-year, renewable term.
            The current Secretary-General, and the 9th occupant of the post, is
            António Guterres of Portugal, who took office on 1 January 2017. On
            the 18th of June, 2021, Guterres was re-appointed to a second term,
            pledging as his priority to continue helping the world chart a
            course out of the COVID-19 pandemic.
          </p>
        </div>
      </div>


      {/* Clients */}
      <div className="mt-32 mb-10 flex justify-center">
        <div>
        <h3 className="text-center text-3xl font-semibold mb-5 max-md:text-xl">Clients</h3>
        <img className="max-md:w-[90%] mx-auto" src="https://i.ibb.co.com/0Jj6Qzv/Group-22.png" alt="" />
        </div>
      </div>
    </div>
  );
}
