
const padWithZero = (num: number) => {
  return num.toString().length === 1 ? `0${num}` : num;
}

const getTimeFromDate = (date: Date) => {
  const hours = padWithZero(date.getHours());
  const minutes = padWithZero(date.getMinutes());
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  return `${hours}:${minutes} ${ampm}`;
}

type FeedItemProps = {
  name: string;
  dose: string;
  taken_at: Date;
}

export default function FeedItem({ name, dose, taken_at }: FeedItemProps) {
  return (
        <div className="flex gap-4">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4">
              <path
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                />
            </svg>
          </div>

          <div className="bg-slate-50 rounded-lg shadow-md box-border h-24 w-60 flex flex-col justify-evenly items-center">
            <div className="">
              <a href="#!" className="">{name} <time>{getTimeFromDate(taken_at)}</time></a>
            </div>
            <p className="">
              2x {dose}mg
            </p>
          </div>
      </div>
  )
}