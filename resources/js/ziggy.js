const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"medical-records.index":{"uri":"api\/medical-records","methods":["GET","HEAD"]},"medical-records.store":{"uri":"api\/medical-records","methods":["POST"]},"medical-records.show":{"uri":"api\/medical-records\/{medical_record}","methods":["GET","HEAD"],"parameters":["medical_record"]},"medical-records.update":{"uri":"api\/medical-records\/{medical_record}","methods":["PUT","PATCH"],"parameters":["medical_record"]},"medical-records.destroy":{"uri":"api\/medical-records\/{medical_record}","methods":["DELETE"],"parameters":["medical_record"]},"doctor.login":{"uri":"doctor\/login","methods":["GET","HEAD"]},"doctor.logout":{"uri":"doctor\/logout","methods":["POST"]},"doctor.dashboard":{"uri":"doctor\/dashboard","methods":["GET","HEAD"]},"schedule.show":{"uri":"doctor\/schedule","methods":["GET","HEAD"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"doctors.index":{"uri":"doctors","methods":["GET","HEAD"]},"doctors.create":{"uri":"doctors\/create","methods":["GET","HEAD"]},"doctors.store":{"uri":"doctors","methods":["POST"]},"doctors.edit":{"uri":"doctors\/edit\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"doctors.update":{"uri":"doctors\/{id}","methods":["PUT"],"parameters":["id"]},"doctors.destroy":{"uri":"doctors\/{id}","methods":["DELETE"],"parameters":["id"]},"schedules.index":{"uri":"schedules","methods":["GET","HEAD"]},"schedules.create":{"uri":"schedules\/create","methods":["GET","HEAD"]},"schedules.store":{"uri":"schedules","methods":["POST"]},"schedules.edit":{"uri":"schedules\/edit\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"schedules.update":{"uri":"schedules\/{id}","methods":["PUT"],"parameters":["id"]},"schedules.destroy":{"uri":"schedules\/{id}","methods":["DELETE"],"parameters":["id"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
