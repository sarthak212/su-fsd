import CardTable from "./components/CardTable";
import { Box, Container } from "@radix-ui/themes";

export default async function Home() {
  let formatData = [];
  try {
    let url;
    if (process.env.HOST_URL) {
      if (process.env.HOST_URL.includes("localhost")) {
        url = `http://${process.env.HOST_URL}/api/lists`;
      } else {
        url = `https://${process.env.HOST_URL}/api/lists`;
      }
    }
    if (!url) {
      url = `https://${process.env.VERCEL_URL}/api/lists`;
    }
    const data = await fetch(url, {
      cache: "no-cache",
    });
    const receivedData = await data.json();
    formatData = receivedData.map((record: { date: string; name: string }) => {
      return {
        ...record,
        date: new Date(record.date),
      };
    });
  } catch {
    return <div>Something went wrong with this domain: {process.env.HOST_URL}</div>;
  }
  return (
    <Container size={"2"} py={"9"}>
      <Box>
        <CardTable data={formatData} />
      </Box>
    </Container>
  );
}
