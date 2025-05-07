import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CartItem } from '../types/cart.types';

// Interface for order data
export interface OrderData {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  totalAmount: number;
  date: Date;
}

// Function to save an order to Firestore
export const saveOrder = async (orderData: OrderData): Promise<string> => {
  try {
    // Convert date to Firestore Timestamp
    const orderWithTimestamp = {
      ...orderData,
      date: Timestamp.fromDate(orderData.date)
    };
    
    // Add a new document to the orders collection
    const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

// Function to get all orders (could be used in an admin interface)
export const getOrders = async (): Promise<Array<OrderData & { id: string }>> => {
  try {
    const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        customerInfo: data.customerInfo,
        items: data.items,
        totalAmount: data.totalAmount,
        date: data.date.toDate(), // Convert Timestamp back to Date
      };
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};