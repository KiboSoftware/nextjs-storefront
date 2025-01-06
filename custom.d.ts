declare namespace JSX {
  interface IntrinsicElements {
    'kibo-shopper-agent': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      location: string
    }
    'df-messenger-chat-bubble': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
  }
}
