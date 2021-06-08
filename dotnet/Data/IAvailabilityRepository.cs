﻿using AvailabilityNotify.Models;
using System.Threading.Tasks;

namespace AvailabilityNotify.Services
{
    public interface IAvailabilityRepository
    {
        Task<MerchantSettings> GetMerchantSettings();
        Task SetMerchantSettings(MerchantSettings merchantSettings);
        Task<bool> IsInitialized();
        Task SetInitialized();

        Task<bool> VerifySchema();

        Task<bool> SaveNotifyRequest(NotifyRequest notifyRequest, RequestContext requestContext);
        Task<NotifyRequest[]> ListRequestsForSkuId(string skuId, RequestContext requestContext);
        Task<NotifyRequest[]> ListNotifyRequests();
    }
}