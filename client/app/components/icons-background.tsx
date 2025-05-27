'use server';

// components/IconBackground.tsx
import {
  FaBeer,
  FaHeart,
  FaUserFriends,
  FaCamera,
  FaMusic,
} from 'react-icons/fa';
import { MdPets, MdSportsSoccer, MdEmojiEmotions } from 'react-icons/md';
import { AiFillStar, AiOutlineSmile } from 'react-icons/ai';
import { useEffect, useLayoutEffect, useMemo, useState, type JSX } from 'react';

const iconsList = [
  FaBeer,
  FaHeart,
  FaUserFriends,
  FaCamera,
  FaMusic,
  MdPets,
  MdSportsSoccer,
  MdEmojiEmotions,
  AiFillStar,
  AiOutlineSmile,
];

const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const colors = [
  '#f43f5e',
  '#3b82f6',
  '#10b981',
  '#eab308',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#22c55e',
  '#0ea5e9',
];

// export default function IconsBackground({ count = 150 }: { count?: number }) {
//   const [icons, setIcons] = useState<JSX.Element[]>([]);

//   useLayoutEffect(() => {
//     const generated = Array.from({ length: count }, (_, i) => {
//       const Icon = iconsList[getRandom(0, iconsList.length - 1)];
//       const size = getRandom(20, 50);
//       const left = getRandom(0, 100);
//       const top = getRandom(0, 100);
//       const color = colors[Math.floor(Math.random() * colors.length)];

//       return (
//         <Icon
//           key={i}
//           style={{
//             position: 'absolute',
//             left: `${left}%`,
//             top: `${top}%`,
//             fontSize: `${size}px`,
//             opacity: 0.5,
//             color,
//           }}
//         />
//       );
//     });

//     setIcons(generated);
//   }, [count]);

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         zIndex: 0,
//         overflow: 'hidden',
//         width: '100%',
//         height: '100%',
//       }}
//     >
//       {icons}
//     </div>
//   );
// }

export default function IconsBackground({ count = 150 }: { count?: number }) {
  const icons = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const Icon = iconsList[getRandom(0, iconsList.length - 1)];
      const size = getRandom(20, 50);
      const left = getRandom(0, 100);
      const top = getRandom(0, 100);
      const color = colors[getRandom(0, colors.length - 1)];

      return (
        <Icon
          key={i}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            fontSize: `${size}px`,
            opacity: 0.5,
            color,
          }}
        />
      );
    });
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {icons}
    </div>
  );
}
