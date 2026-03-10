import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react"
import * as Progress from "@radix-ui/react-progress"
import { Button } from "./ui/button"
import { motion } from "motion/react"
import { Upload, useUploads } from "../store/uploads"
import { formatBytes } from "../utils/format-bytes"

interface UploadWidgetUploadItemProps {
  upload: Upload;
  uploadId: string;
}

export function UploadWidgetUploadItem({
  upload,
  uploadId
} : UploadWidgetUploadItemProps) {

  const cancelUpload = useUploads((store) => store.cancelUpload)

  return (
    <motion.div
      className="flex flex-col gap-3 shadow-shape-content bg-white/2 p-3 rounded-lg relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium flex items-center gap-1">
          <ImageUp className="size-4 text-zinc-300" strokeWidth={1.5}/>
          <span>{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">{formatBytes(upload.file.size)}</span>

          <div className="bg-zinc-700 size-1 rounded-full" />

          <span>
            300KB
            <span className="text-green-400 ml-1">94%</span>
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {upload.status === "success" && <span>100%</span>}
          {upload.status === "progress" && <span>45%</span>}
          {upload.status === "error" && (
            <span className="text-red-400">Error</span>
          )}
          {upload.status === "cancelled" && (
            <span className="text-yellow-400">Cancelled</span>
          )}
        </span>
      </div>

      <Progress.Root
        data-status={upload.status}
        className="bg-zinc-800 rounded-full h-1 overflow-hidden group"
      >
        <Progress.Indicator 
          className="bg-indigo-500 h-1 group-data-[status=success]:bg-green-400 group-data-[status=error]:bg-red-400 group-data-[status=cancelled]:bg-yellow-400"
          style={{ width: upload.status === "progress" ? "45%" : "100%" }}
        />
      </Progress.Root>

      <div className="flex items-center gap-1 absolute top-2.5 right-2.5">

        <Button size="icon-sm" disabled={upload.status !== "success"}>
          <Download className="size-4" strokeWidth={1.5}/>
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="icon-sm" disabled={upload.status !== "success"}>
          <Link2 className="size-4" strokeWidth={1.5}/>
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button
          disabled={!["cancelled", "error"].includes(upload.status)}
          size="icon-sm"
        >
          <RefreshCcw className="size-4" strokeWidth={1.5}/>
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== "progress"}
          size="icon-sm"
          onClick={() => cancelUpload(uploadId)}
        >
          <X className="size-4" strokeWidth={1.5}/>
          <span className="sr-only">Cancel</span>
        </Button>

      </div>
    </motion.div>
  )
}
