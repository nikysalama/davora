import { doc, runTransaction } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const updateStock = async (items) => {
    try {
        await runTransaction(db, async (transaction) => {
            const productRefs = [];
            const productDataMap = new Map();

            // Primera fase: Leer todos los productos
            for (const item of items) {
                const productRef = doc(db, 'products', item.id);
                const productSnapshot = await transaction.get(productRef);

                if (!productSnapshot.exists()) {
                    throw new Error(`El producto con nombre ${item.name} ya no existe.`);
                }

                const productData = productSnapshot.data();
                productRefs.push(productRef);
                productDataMap.set(item.id, { ...productData, quantity: item.quantity });
            }

            // Segunda fase: Verificar stock y escribir actualizaciones
            for (const productRef of productRefs) {
                const item = items.find((i) => i.id === productRef.id);
                const { stock: currentStock, quantity } = productDataMap.get(item.id);

                // Verificar si hay suficiente stock
                if (currentStock < quantity) {
                    throw new Error(`Lo sentimos, no hay stock suficiente para el producto ${item.name}.`);
                }

                // Calcular el nuevo stock
                const newStock = currentStock - quantity;

                // Actualizar el stock en la transacción
                transaction.update(productRef, { stock: newStock });
            }
        });

        console.log('Stock actualizado correctamente para todos los productos.');
        return null;
    } catch (error) {
        throw new Error(error.message || 'Error desconocido al actualizar el stock.');
    }
};