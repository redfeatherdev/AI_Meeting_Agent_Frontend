const TeamOrganization = () => {
  return (
    <div className="flex justify-center">
      <div className="grow rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h2 className="font-medium text-black dark:text-white text-xl">
            Team Organization
          </h2>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Invite Team Member
            </label>
            <input
              name='summary'
              type="text"
              placeholder="Input email address"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <button
              className="w-full inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Send Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamOrganization