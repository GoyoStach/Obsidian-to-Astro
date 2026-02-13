export interface SyncConfig {
  obsidianPath: string
  projectPath: string
  imagePath: string
}

export interface DiscoveryResult {
  totalFiles: number
  exposedFiles: string[]
  skippedFiles: number
}

export interface ProcessingStats {
  filesProcessed: number
  imagesCopied: number
  imagesDeduplicated: number
  tagsExtracted: number
  linksConverted: number
  executionTime: number
  warnings: string[]
}
