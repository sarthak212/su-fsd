import CardTable from "./components/CardTable";
import { Box, Container } from "@radix-ui/themes";

export default async function Home() {
  let formatData = [];
  try {
    const data = await fetch(`${process.env.HOST_URL}/api/lists`);
    const receivedData = await data.json();
    formatData = receivedData.map((record: { date: string; name: string }) => {
      return {
        ...record,
        date: new Date(record.date),
      };
    });
  } catch (e) {
    return <div>Something went wrong</div>;
  }
  return (
    <Container size={"2"} py={"9"}>
      <Box>
        <CardTable data={formatData} />
      </Box>
    </Container>
  );
}
