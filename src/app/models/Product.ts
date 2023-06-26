import { Category } from "./Category";

export interface Product {
    id: number,
    title: string,
    price: number,
    category: Category,
    description: string
    images: string[]
}

/// Extends nos ayuda a Heredar las propiedades - Omit - omitir alguna propiedad de la entidad a heredar

export interface NuevoProductoDto extends Omit<Product, 'id' | 'category'>
{
    categoryId: number;
}

/// Partial - Sirver para que las propiedades heredadas no sean obligatorias(?).

export interface ActualizarProductoDto extends Partial<NuevoProductoDto>{}