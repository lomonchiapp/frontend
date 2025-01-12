declare module 'react-google-recaptcha' {
  import { Component } from 'react'

  export interface ReCAPTCHAProps {
    sitekey: string
    onChange?: (token: string | null) => void
    theme?: 'light' | 'dark'
    ref?: React.RefObject<any>
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void
  }
} 