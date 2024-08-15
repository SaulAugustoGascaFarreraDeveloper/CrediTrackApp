import {z} from "zod"

export type ClientProps = {
    name: string
    lastName: string
    phone: string
}


export const ClientSchema = z.object({
    name: z.string().min(1,{message:"El nombre del cliente es un campo obligatorio"}).optional(),
    lastName: z.string().min(1,{message:"El apellido es un campo obligatorio"}),
    phone: z.string().min(1,{message:"El telefono es un campo obligatorio"})

})


export const EditClientSchema = z.object({
    name: z.string().min(1,{message:"El nombre del cliente es un campo obligatorio"}).optional(),
    lastName: z.string().min(1,{message:"El apellido es un campo obligatorio"}).optional(),
    phone: z.string().min(1,{message:"El telefono es un campo obligatorio"}).optional(),
    //currentName: z.string().optional(), // Campo adicional para el valor actual del nombre

})
// .superRefine((data,ctx) => {
//     // Validación personalizada para `name`
//   if (data.name  && data.currentName && data.name === data.currentName) {
//     ctx.addIssue({
//         code: "custom",
//         path: ['name'],
//         message: "El nombre del cliente no ha cambiado",
//       });
//   }
// })