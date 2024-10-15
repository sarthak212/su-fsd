"use client";
import { Box, Flex, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import handleSort from "../lib/sort";

export default function CardTable({
  data,
}: {
  data?: {
    date: Date;
    name: string;
  }[];
}) {
  const [allData, setAllData] = useState(data);
  const [sortedValue, setSortedValue] = useState("");

  useEffect(() => {
    if (sortedValue) {
      const values = data
        ? [...data].sort((a, b) => {
            if (sortedValue === "date") {
              return a.date.getTime() - b.date.getTime();
            } else if (sortedValue === "name-asc") {
              return handleSort(a, b);
            } else if (sortedValue === "name-desc") {
              return handleSort(b, a);
            }
            return 0;
          })
        : [];
      setAllData(values);
    }
  }, [sortedValue]);
  return (
    <Flex direction={"column"} gap={"5"}>
      <Box>
        <Select.Root
          defaultValue="date"
          value={sortedValue}
          onValueChange={(e) => {
            setSortedValue(e);
          }}
        >
          <Select.Trigger
            placeholder="Sort By"
            style={{
              minWidth: "200px",
            }}
          />
          <Select.Content>
            <Select.Item value="date">Sort by Created At</Select.Item>
            <Select.Item value="name-asc">Sort by Name ASC</Select.Item>
            <Select.Item value="name-desc">Sort by Name DESC</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>

      <Flex maxWidth={"100%"} gap={"3"} wrap={"wrap"}>
        {allData &&
          allData?.map((record, index) => (
            <Flex
              className="min-w-[250px] py-2 px-3 border-gray-200 border rounded"
              key={record.name + record.date.getTime() + index}
            >
              <Flex gap={"2"} direction={"column"}>
                <Text size={"2"}>
                  {record.date.toDateString()}, {record.date.getHours()}:
                  {record.date.getMinutes() || "00"}
                </Text>
                <Text size={"2"} weight={"medium"} highContrast>
                  {record.name}
                </Text>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
}
