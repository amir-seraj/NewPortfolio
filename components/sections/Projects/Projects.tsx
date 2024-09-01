import { Box, Container, Text } from '@components/ui';
import { Card } from '@components/projects';
import { Footer } from '@components/common';
import { GetInTouch } from '..';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects = ({ allprojects }) => {
  return (
    <Box>
      <Container className='mt-20 mb-6 md:mt-24'>
        <Text as='h2' fontSize='4xl'>
          <motion.span
            className='block'
            initial={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Projects
          </motion.span>
        </Text>
      </Container>
      <AnimatePresence>
        <Container className='grid grid-cols-2 gap-4 pb-12 md:grid-cols-3 md:gap-x-6 md:gap-y-12 2xl:grid-cols-4'>
          {allprojects.map(
            (
              {
                id,
                title,
                description,
                coverImage,
                publishedAt,
                readTime,
                slug,
              },
              idx
            ) => (
              <motion.div
                key={id}
                initial={{
                  opacity: 0,
                  y: -20,
                  scale: idx % 2 === 0 ? 1.2 : 0.9,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: idx * 0.15,
                  duration: 1,
                  ease: [0.6, 0.05, -0.01, 0.9],
                }}
              >
                <Card
                  slug={slug}
                  description={description}
                  title={title}
                  coverImage={coverImage}
                  date={publishedAt}
                  readTime={readTime}
                />
              </motion.div>
            )
          )}
        </Container>
      </AnimatePresence>
      <GetInTouch />
      <Footer />
    </Box>
  );
};
