import { DownloadIcon } from "@/assets/svgs";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/types";
import { ArrowDown } from "lucide-react";
import React from "react";
import { Checkbox, ReusableBadge, TeamsBadge } from "../fragments";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// interface User {
//   id: string;
//   name: string;
//   avatar: string;
// }

// interface UserRole {
//   id: string;
//   name: string;
//   type: "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";
//   dateCreated: string;
//   status: "Active" | "In Active";
//   users: User[];
// }

// const data: UserRole[] = [
//   {
//     id: "1",
//     name: "Superadmin",
//     type: "DEFAULT",
//     dateCreated: "Jan 1, 2023",
//     status: "Active",
//     users: [
//       { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
//       { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
//       { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
//       { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
//       { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
//       { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
//       { id: "7", name: "User 7", avatar: AVATAR_USER_TWO },
//     ],
//   },
//   {
//     id: "2",
//     name: "Merchantadmin",
//     type: "DEFAULT",
//     dateCreated: "Feb 1, 2023",
//     status: "Active",
//     users: [
//       { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
//       { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
//       { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
//       { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
//       { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
//       { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
//     ],
//   },
//   {
//     id: "3",
//     name: "Merchantadmin",
//     type: "DEFAULT",
//     dateCreated: "Feb 1, 2023",
//     status: "In Active",
//     users: [
//       { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
//       { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
//       { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
//       { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
//       { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
//       { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
//     ],
//   },
//   // Add more sample data as needed
// ];

type HEADER_TYPE = {
  name: string;
  hasSort: boolean;
  accessor: string;
};

interface ReusableTableProps {
  title?: string;
  headerList: HEADER_TYPE[];
  hasDownloadBtn?: boolean;
  handleExport?: () => void;
  hasCheck?: boolean;
  dataList: any;
}

export default function ReusableTable({
  title,
  headerList,
  hasDownloadBtn,
  handleExport,
  hasCheck = false,
  dataList,
}: ReusableTableProps) {
  const [selectedRoles, setSelectedRoles] = React.useState<Set<string>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "", direction: "asc" });

  const toggleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = React.useMemo(() => {
    return [...dataList].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
  }, [sortConfig]);

  const toggleRole = (roleId: string) => {
    setSelectedRoles((current) => {
      const updated = new Set(current);
      if (updated.has(roleId)) {
        updated.delete(roleId);
      } else {
        updated.add(roleId);
      }
      return updated;
    });
  };

  console.log(sortedData);

  const toggleAll = () => {
    setSelectedRoles((current) =>
      current.size === dataList.length
        ? new Set()
        : new Set(dataList.map((role: Dictionary) => role._id))
    );
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          !title && hasDownloadBtn && "justify-end"
        )}
      >
        {title && (
          <h3 className="text-md font-normal text-clr_gray_600 tracking-wide lg:text-">
            {title}
          </h3>
        )}
        {hasDownloadBtn && (
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 font-normal text-gray-700"
            onClick={handleExport}
          >
            <DownloadIcon /> Download all
          </Button>
        )}
      </div>
      <div className="rounded-md border shadow-shadowTwo">
        <Table>
          <TableHeader>
            <TableRow>
              {hasCheck && (
                <TableHead className="w-12">
                  <Checkbox
                    isChecked={selectedRoles.size === dataList.length}
                    handleClick={toggleAll}
                    type="CHECK"
                    className="rounded-sm"
                  />
                </TableHead>
              )}
              {headerList?.map(({ name, hasSort, accessor }, idx) => (
                <TableHead
                  key={idx}
                  className="cursor-pointer"
                //   onClick={() => hasSort && toggleSort(accessor)}
                >
                  <div className="flex items-center font-normal text-[.8rem]">
                    {name}
                    {hasSort && <ArrowDown className="ml-2 h-4 w-4" />}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {Object.values( */}
            {
                sortedData.map((data, idx) => {
                  return (
                    <TableRow key={data._id} className="bg-white">
                      {hasCheck && (
                        <TableCell>
                          <Checkbox
                            isChecked={selectedRoles.has(data._id)}
                            handleClick={() => toggleRole(data._id)}
                            type="CHECK"
                            className="rounded-sm"
                          />
                        </TableCell>
                      )}
                      {Object.entries(data)
                        .filter(([key, value]) => {
                          return key !== "_id";
                        })
                        .map((item: any) => (
                          <TableCell key={idx} className="text-xs text-gray-600">
                            {item[1]}
                          </TableCell>
                        ))}
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <DownloadIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })

            }
            {/* {sortedData.map((item) => (
              <TableRow key={item.id} className="bg-white">
                {hasCheck && (
                  <TableCell>
                    <Checkbox
                      isChecked={selectedRoles.has(item.id)}
                      handleClick={() => toggleRole(item.id)}
                      type="CHECK"
                      className="rounded-sm"
                    />
                  </TableCell>
                )}
                <TableCell className="text-xs text-gray-600">
                  {item.name}
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {item.type}
                </TableCell>
                <TableCell>{item.dateCreated}</TableCell>
                <TableCell>
                  <ReusableBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <TeamsBadge data={item.users} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <DownloadIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}