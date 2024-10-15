import CardTable from "./components/CardTable";
import { Box, Container } from "@radix-ui/themes";

export default async function Home() {
  let formatData = [];
  try {
    let url = process.env.HOST_URL ? `http://${process.env.HOST_URL}/api/lists` : null;
    if (!url) {
      url = `https://${process.env.VERCEL_URL}/api/lists`;
    }
    const data = await fetch(url);
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
