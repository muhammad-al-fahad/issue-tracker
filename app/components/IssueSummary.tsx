import { Status } from "@prisma/client";
import Link from "next/link";

export interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueSummary = async ({ open, in_progress, closed }: Props) => {
  const summary: { label: string; value: number, status: Status }[] = [
    { label: "Open", value: open, status: 'OPEN' },
    { label: "In Progress", value: in_progress, status: 'IN_PROGRESS' },
    { label: "Closed", value: closed, status: 'CLOSED' },
  ];

  return (
    <div className="flex space-x-4 justify-evenly">
      {summary.map((item) => (
        <div
          key={item.label}
          className="w-full rounded overflow-hidden shadow-md"
        >
          <div className="px-6 py-4">
            <Link href={`/issues?status=${item.status}`} className="font-medium text-sm mb-2">{item.label.toUpperCase()} ISSUES</Link>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block text-2xl font-bold text-gray-700 mr-2 mb-2">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueSummary;
