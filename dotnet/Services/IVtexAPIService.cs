﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AvailabilityNotify.Models;

namespace AvailabilityNotify.Services
{
    public interface IVtexAPIService
    {
        Task<bool> AvailabilitySubscribe(string email, string sku, string name);
        Task<bool> ProcessNotification(AffiliateNotification notification);
        Task<bool> ProcessNotification(BroadcastNotification notification);
        Task<bool> VerifySchema();
        Task<bool> CreateDefaultTemplate();
        Task<List<string>> ProcessAllRequests();
    }
}