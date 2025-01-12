declare module 'react-google-recaptcha-v2' {
  import { Component } from 'react'

  export interface ReCAPTCHAProps {
    sitekey: string
    onChange?: (token: string | null) => void
    ref?: React.RefObject<any>
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void
  }
} 