import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.epai.core.dao.TestTbDao;
import com.epai.core.pojo.TestTb;
import com.epai.core.service.TestService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:application-context.xml"})
public class Test {

	@Autowired
	private TestService service;
	
	@org.junit.Test
	public void testADD()throws Exception{
		TestTb tb = new TestTb();
		tb.setName("epai");
		service.insertTb(tb);
	}
}
