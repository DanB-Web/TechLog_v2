import { User as UserDB } from '../models/userModel.js';
import { Report as ReportDB } from '../models/reportModel.js';
import { Company as CompanyDB } from '../models/companyModel.js';

//Query Resolvers
const Query = {
  reportDetail: async (root, args, context) => {
    const { id } = args;
    const report = await ReportDB.findById(id);
    return report;
  },
  companyDetails: async (root, args, context) => {
    const { id } = args;
    const company = await CompanyDB.findById(id);
    return company;
  },
  companyReports: async (root, args, context) => {
    const { id } = args;
    const reports = await ReportDB.find({company: id});
    return reports;
  },
  myReports: async (root, args, context) => {
    const { id } = args;
    const reports = await ReportDB.find({user: id});
    return reports;
  }
}

//Type Resolvers
const Report = {
  user: async (args) => {
    const { user } = args;
    const reportUser = await UserDB.findOne({_id: user});
    return reportUser;
  },
  company: async (args) => {
    const { company } = args;
    const reportCompany = await CompanyDB.findOne({_id: company});
    return reportCompany;
  },
  approvedBy: async (args) => {
    const { approvedBy }= args;
    const reportApproved = await UserDB.findOne({_id: approvedBy});
    return reportApproved;
  }
}

const Company = {
  users: async (args) => {
    const { id } = args;
    const companyUsers = await UserDB.find({company: id});
    return companyUsers;
  },
  reports: async (args) => {
    const { id } = args;
    const companyReports = await ReportDB.find({company: id});
    return companyReports;
  }
}

const User = {
  company: async (args) => {
    const { id } = args;
    const userDetails = await UserDB.findOne({_id: id});
    const { company } = userDetails;
    const companyDetails = await CompanyDB.findOne({_id: company});
    return companyDetails;
  },
  reports: async (args) => {
    const { id } = args;
    const userReports = await ReportDB.find({user: id});
    return userReports;
  }
}

const Comment = {
  time: async (args) => {
    const { time } = args;
    return time;
  }
}

const resolvers = { Query, Report, Company, User, Comment }

export { resolvers }; 