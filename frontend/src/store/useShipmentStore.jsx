import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';

export const useShipmentStore = create((set) => ({
    shipments : [],
    isLoadding : false,
    isUpdating : false,

    addShipment : async(formData) => {
        set({isLoadding : true});
        try {
            const res = await axiosInstance.post('/shipment', formData);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            set({isLoadding : false});
        }
    },

    getAllShipments : async() => {
        set({isLoadding : true});
        try {
            const res = await axiosInstance.get('/shipment');
            set({shipments : res.data});
            console.log(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            set({isLoadding : false});
        } 
    },

    updateShipmentLocation : async(id, location) => {
        set({isUpdating : true});
        try {
            const res = await axiosInstance.put(`/shipment/${id}/update-location`, { destination: location });
            console.log(res);
        } catch (error) {
            console.log(error)
        } finally {
            set({isUpdating : false});
        }
    }
}))