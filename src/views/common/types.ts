
export interface Template {
      auditor: string[]
      type: number
      desc: string
      source?: string
}

export interface OrderItem {
      type: string
      idc: string
      source: string
      data_base: string
      table: string
      delay: string
      text: string
      backup: number
}

export interface SQLTesting {
      status: number
      level: number
      error: string
      sql: string
      affect_rows: string
}