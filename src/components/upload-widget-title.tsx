import { UploadCloud } from "lucide-react"

export function UploadWidgetTitle() {
  const isTheseAnyPendingUpload = true
  const uploadGlobalPercentage = 60

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">

      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      {isTheseAnyPendingUpload ? (
        <span className="flex items-baseline gap-1">
          Uploading{" "}
          <span className="text-sm text-zinc-400 tabular-nums">
            {uploadGlobalPercentage}%
          </span>
        </span>
      ) : (
          <span>Upload Files</span>
      )}

    </div>
  )
}
