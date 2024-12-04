const HistoryDetailView = ({ open, onClose, loading, chatHistories }: {
  open: boolean,
  onClose: () => void,
  loading: boolean,
  chatHistories: any[] | null
}) => {
  return (
    open && (
      <div
        className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 cursor-pointer"
        onClick={onClose}
      >
        <div
          className="w-full max-w-142.5 h-[600px] rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-12.5 md:py-10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">Meeting History</span>
          </div>
          <div className={`grow flex flex-col ${loading ? "justify-center items-center" : "mt-3"} overflow-auto`}>
            {loading ? <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
              :
              <div className="flex flex-col items-start">
                {chatHistories?.map((chat, index) => (
                  <div key={index} className="mt-1">
                    <span>{chat.Speaker} : {chat.text}</span>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    )
  )
}

export default HistoryDetailView;