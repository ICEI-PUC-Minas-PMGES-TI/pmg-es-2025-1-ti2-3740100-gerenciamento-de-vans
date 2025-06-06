// global.d.ts
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-place-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          style?: React.CSSProperties;
          ref?: React.RefObject<HTMLElement>;
        },
        HTMLElement
      >;
    }
  }
}