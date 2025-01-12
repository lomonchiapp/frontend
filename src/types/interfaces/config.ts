export interface GlobalConfig {
    companyName: string
    companyRnc: string
    companyLogo: string
    companyEmail: string
    companyWebsite: string
    companyAddress: string
    companyPhone: string
}

export interface DashboardConfig {
    layout: 'grid' | 'list'
    widgets: string[]
}

export interface StyleConfig {
    primaryColor: string
    secondaryColor: string
    accentColor: string
}

export interface UserConfig {
    userId: string
    theme: 'light' | 'dark'
    notificationsEnabled: boolean
    dashboardConfig: DashboardConfig
    styleConfig: StyleConfig
}