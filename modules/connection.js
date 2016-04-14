var connectionString = '';

if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
  connectionString = 'postgres://vvzocdpihzifnd:DqFGPcF72BBjhrgHeTJqFqYXaT@ec2-23-21-249-224.compute-1.amazonaws.com:5432/d2kqufrqr5jp6g';
}

module.exports = connectionString;
