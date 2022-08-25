import { Box, Button, Container, Text } from "@components/ui";
import { Calendy } from "@components/common";

export const GetInTouch = () => (
  <Box className="mb-10 bg-slate-50  py-12 text-center dark:bg-[#008576]">
    <Container>
      <Text as="h2" className="mb-4" fontSize="4xl" align="center">
        Get in touch
      </Text>
      <Text className="max-w-md mx-auto mb-5 opacity-75" align="center">
        You have a cool project that you want to discuss or a tech article you
        want written? I&lsquo;d love to hear from you.
      </Text>
      <Box>
        <Button
          variant="primary"
          size="lg"
          href="mailto:amirseraj.ir@gmail.com"
          className="mr-3 text-sm uppercase font-heading"
        >
          send me an email
        </Button>
        <Calendy>Schedule a meeting</Calendy>
      </Box>
    </Container>
  </Box>
);
