import { useDropzone } from "react-dropzone"
import CircularProgressBar from "./ui/circular-progress-bar";
import { usePendingUploads, useUploads } from "../store/uploads";

export function UploadWidgetDropzone() {
  const numberOfUploads = useUploads((store) => store.uploads.size)
  const addUploads = useUploads((store) => store.addUploads)
  const { isThereAnyPendingUpload, globalPercentage } = usePendingUploads()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": []
    },
    onDrop(acceptedFiles: any) {
      addUploads(acceptedFiles)
    }
  });

  return (
    <div className="px-3 flex flex-col gap-3">
      <div
        data-active={isDragActive}
        className="cursor-pointer text-zinc-400 bg-black/20 p-5 h-32 rounded-lg border border-zinc-700 border-dashed flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500"
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />
        {isThereAnyPendingUpload ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={globalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span className="text-xs">
              Uploading {numberOfUploads} files...
            </span>
          </div>
        ) : (
          <>
            <span className="text-xs">Drop your files here or </span>
            <span className="text-xs underline">click to open picker</span>
          </>
        )}
      </div>

      <span className="text-xxs text-zinc-400">
        Only JPG and PNG files are accepted
      </span>
    </div>
  )
}
