import { VscMenu } from 'react-icons/vsc';

export const MenuButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <button
      aria-label='Open menu'
      aria-haspopup='dialog'
      // p-2.5/-m-2.5: 44px hit area around the 24px glyph without moving layout
      className='-m-2.5 transform p-2.5 hover:scale-90'
      onClick={onOpen}
    >
      <VscMenu className='h-6 w-auto' />
    </button>
  );
};
