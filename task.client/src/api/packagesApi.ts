import axiosInstance from './axiosInstance';
import type { Package } from '../types/package'
import type { PackageDetails } from '../types/packageDetails'
import type { CreatePackageRequest } from '../types/createPackageRequest'
import type { CreatePackageResponse } from '../types/createPackageResponse'
import type { Status } from '../types/status';

export const packagesApi= {
    getAllPackages: async (): Promise<Package[]> => {
        const response = await axiosInstance.get<Package[]>('/packages');
        return response.data;
    },

    getPackageById: async (id: number): Promise<PackageDetails> => {
        const response = await axiosInstance.get<PackageDetails>(`/packages/${id}`);
        return response.data;
    },

    createPackage: async (request: CreatePackageRequest): Promise<CreatePackageResponse> => {
        const response = await axiosInstance.post<CreatePackageResponse>('/packages', request);
        return response.data;
    },

    updatePackageStatus: async (id: number, status: Status): Promise<PackageDetails> => {
        const response = await axiosInstance.post<PackageDetails>(`/packages/${id}/status`, { status });
        return response.data;
    }
};