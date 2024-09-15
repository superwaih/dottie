"use client"
import FileUploader from './file-uploader'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { compressImage, ENDPOINT } from '@/utils'
import axios from 'axios'

const UploadComponent = () => {
    const formSchema = z.object({
        // username: z.string().min(2, {
        //   message: "Username must be at least 2 characters.",
        // }),
        files: z.custom<File[]>()
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          // username: "",
          files: []
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        const file = values.files[0]
        if (file) {
          const result = await compressImage(file, 50); // 50 KB target size
    
          if (result.success) {
            console.log(result.compressedImagePath);
          } else {
            console.error(result.error);
          }
        }
        
      }
  return (
    <div className='max-w-7xl w-full'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
        name='files'
          render={({field}) =>(
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default UploadComponent